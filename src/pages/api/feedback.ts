export const prerender = false;

import type { APIRoute } from 'astro';

const RECIPIENTS: Record<string, string> = {
  'ask-term': 'usercontent@yourwillpro.com.au',
  'report-error': 'support@yourwillpro.com.au',
  'general': 'feedback@yourwillpro.com.au',
  'choose-service': 'don@yourwillpro.com.au',
  'suggestion': 'feedback@yourwillpro.com.au',
  'share-story': 'usercontent@yourwillpro.com.au',
};

const SUBJECTS: Record<string, string> = {
  'ask-term': 'Dictionary Term Request',
  'report-error': 'Error Report',
  'general': 'General Feedback',
  'choose-service': 'Help Me Choose Request',
  'suggestion': 'Improvement Suggestion',
  'share-story': 'User Story Submission',
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const formType = formData.get('formType') as string;
    const userEmail = formData.get('email') as string;
    
    const recipient = RECIPIENTS[formType] || 'don@yourwillpro.com.au';
    const subject = SUBJECTS[formType] || 'Website Feedback';
    
    // Build email body from form data
    const fields: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key !== 'formType' && value) {
        fields.push(`<strong>${key}:</strong> ${value}`);
      }
    }
    
    const htmlBody = `
      <h2>${subject}</h2>
      <p>New submission from YourWillPro website:</p>
      <hr>
      ${fields.join('<br><br>')}
      <hr>
      <p style="color: #666; font-size: 12px;">Sent from content.yourwillpro.com.au feedback form</p>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@send.yourwillpro.com.au',
        to: recipient,
        reply_to: userEmail || undefined,
        subject: subject,
        html: htmlBody,
      }),
    });

    if (!resendResponse.ok) {
      const error = await resendResponse.text();
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Feedback error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};