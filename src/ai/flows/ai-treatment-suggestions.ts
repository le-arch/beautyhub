// Implemented AI stylist tool that recommends beauty treatment to user based on their image uploaded.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiTreatmentSuggestionsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AiTreatmentSuggestionsInput = z.infer<typeof AiTreatmentSuggestionsInputSchema>;

const AiTreatmentSuggestionsOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      treatment: z.string().describe('The name of the suggested beauty treatment.'),
      reason: z.string().describe('The reason why this treatment is suggested.'),
    })
  ).describe('A list of beauty treatment suggestions.'),
});
export type AiTreatmentSuggestionsOutput = z.infer<typeof AiTreatmentSuggestionsOutputSchema>;

export async function getAiTreatmentSuggestions(
  input: AiTreatmentSuggestionsInput
): Promise<AiTreatmentSuggestionsOutput> {
  return aiTreatmentSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTreatmentSuggestionsPrompt',
  input: {schema: AiTreatmentSuggestionsInputSchema},
  output: {schema: AiTreatmentSuggestionsOutputSchema},
  prompt: `You are an AI beauty stylist. A user will upload a picture of themselves, and you will provide a list of beauty treatment suggestions tailored to their features and preferences.

  Here is the user's photo:
  {{media url=photoDataUri}}
  
  Respond with the following format:
  [{
    "treatment": "Treatment Name",
    "reason": "Why this treatment is suggested"
  }]`,
});

const aiTreatmentSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiTreatmentSuggestionsFlow',
    inputSchema: AiTreatmentSuggestionsInputSchema,
    outputSchema: AiTreatmentSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
