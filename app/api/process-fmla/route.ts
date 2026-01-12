import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { PDFDocument } from 'pdf-lib';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function extractFMLAData(pdfBase64: string) {
  const prompt = `You are analyzing an FMLA (Family and Medical Leave Act) medical certification form. Extract the following information and return ONLY valid JSON with no additional text:

{
  "employeeName": "full name of employee",
  "employeeJobTitle": "job title if present",
  "leaveStartDate": "start date in YYYY-MM-DD format if present",
  "leaveEndDate": "end date in YYYY-MM-DD format if present",
  "leaveType": "continuous" or "intermittent" or "reduced schedule",
  "healthConditionDescription": "brief description of the condition",
  "healthcareProviderName": "name of doctor/provider",
  "healthcareProviderPhone": "phone number if present",
  "isFormSigned": true or false,
  "signatureDate": "date signed in YYYY-MM-DD if present",
  "estimatedLeaveDuration": "duration description",
  "complianceFlags": ["array of any compliance issues or missing information"]
}

Return ONLY the JSON object, no markdown formatting or additional text.`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'document',
          source: {
            type: 'base64',
            media_type: 'application/pdf',
            data: pdfBase64,
          },
        },
        {
          type: 'text',
          text: prompt,
        },
      ],
    }],
  });

  // Extract text from Claude's response
  const responseText = message.content[0].type === 'text' 
    ? message.content[0].text 
    : '';

  // Parse JSON from response
  try {
    // Remove any markdown code blocks if present
    const cleanedResponse = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanedResponse);
  } catch (e) {
    console.error('Failed to parse AI response:', responseText);
    throw new Error('AI returned invalid JSON');
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer and base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');

    // Get PDF metadata
    const pdfDoc = await PDFDocument.load(bytes);
    const numPages = pdfDoc.getPageCount();

    // Use AI to extract structured data directly from PDF
    const structuredData = await extractFMLAData(base64);

    return NextResponse.json({
      success: true,
      data: structuredData,
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        pageCount: numPages
      }
    });

  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process PDF' },
      { status: 500 }
    );
  }
}