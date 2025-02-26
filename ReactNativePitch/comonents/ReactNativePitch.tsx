import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { View, Text, TextInput, Button } from 'react-native';

const ReactNativePitch = () => {
  const [reactNativeBossText, setReactNativeBossText] = useState(
    "Give me a one-sentence concept and I'll give you an eye-catching title, a synopsis the studios will love, a React Native app UI design... AND choose the components!"
  );

  const [synopsis, setSynopsis] = useState('');

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const handleSendBtnClick = async () => {
    const setupTextarea = document.getElementById('setup-textarea') as HTMLInputElement;
    if (setupTextarea && setupTextarea.value) {
      const userInput = setupTextarea.value;

      setReactNativeBossText(
        'Ok, just wait a second while my digital brain digests that...'
      );
      fetchBotReply(userInput);
      fetchSynopsis(userInput);
    }
  };

  const fetchBotReply = async (outline: string) => {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate a short message to enthusiastically say an outline sounds interesting and that you need some minutes to think about it.
      ###
      // Predefined prompts for different outlines to sound enthusiastic.
      outline: Two dogs fall in love and move to Hawaii to learn to surf.
      message: I'll need to think about that. But your idea is amazing! I love the bit about Hawaii!
      ###
      outline: A plane crashes in the jungle and the passengers have to walk 1000km to safety.
      message: I'll spend a few moments considering that. But I love your idea!! A disaster movie in the jungle!
      ###
      outline: A group of corrupt lawyers try to send an innocent woman to jail.
      message: Wow that is awesome! Corrupt lawyers, huh? Give me a few moments to think!
      ###
      outline: ${outline}
      message: 
      `,
      max_tokens: 60,
    });
    setReactNativeBossText(response.data.choices[0].text.trim());
  };

  const fetchSynopsis = async (outline: string) => {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate an engaging, professional and marketable movie synopsis based on an outline. The synopsis should include actors' names in brackets after each character. Choose actors that would be ideal for this role. 
      ###
      // Predefined prompts for different outlines to generate synopses.
      outline: A big-headed daredevil fighter pilot goes back to school only to be sent on a deadly mission.
      synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.  
      ###
      outline: ${outline}
      synopsis: 
      `,
      max_tokens: 700,
    });
    const synopsis = response.data.choices[0].text.trim();
    setSynopsis(synopsis); // Update the state with the generated synopsis
  };

  return (
    <View>
      <Text>{reactNativeBossText}</Text>
      <TextInput
        id="setup-textarea"
        placeholder="An evil genius wants to take over the world using AI."
      />
      <Button title="Send" onPress={handleSendBtnClick} />
      <Text>{synopsis}</Text> {/* Display the generated synopsis */}
    </View>
  );
};

export default ReactNativePitch;

export const process = {
  env: {
    OPENAI_API_KEY: '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',
  },
};
