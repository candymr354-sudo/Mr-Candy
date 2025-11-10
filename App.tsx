/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, {useState, useEffect, useCallback} from 'react';

const characterImages: Record<string, string> = {
  Nandha: 'https://i.imgur.com/8JWwUfU.jpeg',
  Sister: 'https://i.pinimg.com/originals/7a/28/99/7a289945163e9e3557e0e7a77e20b30b.jpg',
  Ganesh: 'https://i.imgur.com/8JWwUfU.jpeg', // Same face as Nandha
};

const story = [
  {
    title: 'Prologue',
    lines: [
      {
        type: 'NARRATOR',
        text: 'Burmora — a world draped in beauty. Vast green fields, crystal lakes, ancient forests breathing with quiet peace. People live simple lives, believing their world is ordinary.',
      },
      {type: 'NARRATOR', text: 'But Burmora has two faces.'},
      {
        type: 'NARRATOR',
        text: 'Face One — The Visible World: Cops, law, criminals, daily struggle, normal human society. This is the world everyone sees.',
      },
      {
        type: 'NARRATOR',
        text: 'Face Two — The Niral World (Known to Everyone): The Nirals are not a myth. Everyone in Burmora knows them. They are warriors who inherited powers passed down through their ancestors.',
      },
      {
        type: 'NARRATOR',
        text: 'Monsters also exist in this world — not as curses or creations — but as ancient beings whose powers come from their own ancestral bloodlines.',
      },
      {
        type: 'NARRATOR',
        text: 'Whenever monsters appear, citizens step aside and allow the Nirals to fight, for this balance has existed for generations.',
      },
      {
        type: 'NARRATOR',
        text: 'And within this world, where both sides are known and accepted… begins the life of our boy.',
      },
    ],
  },
  {
    title: 'Scene 1: Early Morning – Small Rooftop',
    lines: [
      {
        type: 'NARRATOR',
        text: '(Soft sunrise. A quiet neighborhood. Nandha ties his worn-out shoes.)',
        character: 'Nandha',
      },
      {
        type: 'NARRATOR',
        text: 'Nandha. A boy too kind for this world. His heart is pure, but life has never been gentle to him.',
        character: 'Nandha',
      },
      {
        type: 'NARRATOR',
        text: '(He looks inside the small house where his sister is still sleeping.)',
      },
      {
        type: 'DIALOGUE',
        character: 'Nandha',
        text: '"Another day... we’ll manage, right?"',
      },
    ],
  },
  {
    title: 'Scene 2: Sister’s College',
    lines: [
      {
        type: 'NARRATOR',
        text: '(Sister sits quietly in class. Students whisper and giggle.)',
        character: 'Sister',
      },
      {
        type: 'DIALOGUE',
        character: 'Student 1',
        text: '"Look at her. Can’t even talk."',
      },
      {
        type: 'DIALOGUE',
        character: 'Student 2',
        text: '"Is she dumb or just stupid?"',
      },
      {
        type: 'NARRATOR',
        text: '(Sister’s eyes water. She grips her pencil harder. But she stays silent.)',
        character: 'Sister',
      },
      {
        type: 'NARRATOR',
        text: 'She is 18, a college student. She doesn’t speak. Not because she cannot. But because she doesn’t want her brother to worry.',
        character: 'Sister',
      },
    ],
  },
  {
    title: 'Scene 3: Nandha Working',
    lines: [
      {
        type: 'NARRATOR',
        text: '(Nandha runs between jobs — delivering milk, wiping tables, stacking boxes.)',
        character: 'Nandha',
      },
      {
        type: 'DIALOGUE',
        character: 'Hotel Owner',
        text: '"Faster, Nandha! Customers are waiting!"',
      },
      {
        type: 'DIALOGUE',
        character: 'Nandha',
        text: '"Yes, sir. Right away."',
      },
      {
        type: 'NARRATOR',
        text: 'He breaks his body every day… so her future doesn’t break.',
        character: 'Nandha',
      },
    ],
  },
  {
    title: 'Scene 4: Evening – Small Home',
    lines: [
      {
        type: 'NARRATOR',
        text: '(Sister returns home. Shows no sign of pain. They eat simple food.)',
      },
      {
        type: 'DIALOGUE',
        character: 'Nandha',
        text: '"Someday... you will shine brighter than everyone. I promise."',
      },
      {
        type: 'NARRATOR',
        text: '(Sister touches his hand, giving a small smile.)',
        character: 'Sister',
      },
      {type: 'NARRATOR', text: 'If innocence was a person, it was this home.'},
    ],
  },
  {
    title: 'Scene 5: Underground World – Mafia Territory',
    lines: [
      {
        type: 'NARRATOR',
        text: '(Dark tunnel. Loud music. Gun deals. Statues, drugs, and weapons lined up.)',
      },
      {type: 'NARRATOR', text: 'But far away… the world rots in shadows.'},
      {
        type: 'NARRATOR',
        text: 'There exists a name feared by every criminal.',
      },
      {type: 'NARRATOR', text: 'Ganesh.', character: 'Ganesh'},
      {
        type: 'NARRATOR',
        text: '(His face is never shown. Only his silhouette. Red glowing eyes occasionally visible in darkness.)',
        character: 'Ganesh',
      },
      {
        type: 'DIALOGUE',
        character: 'Gang Member',
        text: '"Boss, shipment arrived. What should we do with the informant?"',
      },
      {
        type: 'DIALOGUE',
        character: 'Ganesh',
        text: '"No one leaves with stories. Finish it."',
      },
      {type: 'NARRATOR', text: '(Gunshot echoes.)'},
      {
        type: 'NARRATOR',
        text: 'His world is blood, lust, and power. A king of darkness.',
        character: 'Ganesh',
      },
    ],
  },
  {
    title: 'Scene 6: Fate’s Shadow',
    lines: [
      {
        type: 'NARRATOR',
        text: '(Screen split: Nandha on left, Ganesh on right. Their faces… identical.)',
      },
      {type: 'NARRATOR', text: 'Two men.'},
      {type: 'NARRATOR', text: 'One pure.'},
      {type: 'NARRATOR', text: 'One drenched in sin.'},
      {type: 'NARRATOR', text: 'But destiny… laughs.'},
      {type: 'NARRATOR', text: 'Because they share the same face.'},
      {type: 'NARRATOR', text: 'This is just the beginning.'},
    ],
  },
];

const App: React.FC = () => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [revealedText, setRevealedText] = useState('');

  const currentScene = story[sceneIndex];
  const currentLine = currentScene.lines[lineIndex];

  const handleNext = useCallback(() => {
    if (lineIndex < currentScene.lines.length - 1) {
      setLineIndex(lineIndex + 1);
    } else if (sceneIndex < story.length - 1) {
      setSceneIndex(sceneIndex + 1);
      setLineIndex(0);
    }
  }, [lineIndex, sceneIndex, currentScene.lines.length]);

  const handlePrev = useCallback(() => {
    if (lineIndex > 0) {
      setLineIndex(lineIndex - 1);
    } else if (sceneIndex > 0) {
      const prevScene = story[sceneIndex - 1];
      setSceneIndex(sceneIndex - 1);
      setLineIndex(prevScene.lines.length - 1);
    }
  }, [lineIndex, sceneIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handlePrev]);

  useEffect(() => {
    setRevealedText('');
    const text = currentLine.text;
    let i = 0;
    const intervalId = setInterval(() => {
      setRevealedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(intervalId);
      }
    }, 25);
    return () => clearInterval(intervalId);
  }, [currentLine]);

  const character =
    currentLine.type === 'DIALOGUE'
      ? currentLine.character
      : currentLine.character;
  const portrait = character ? characterImages[character] : null;

  const showNandha =
    character === 'Nandha' ||
    (sceneIndex === 6 && lineIndex > 0);
  const showSister = character === 'Sister';
  const showGanesh =
    character === 'Ganesh' ||
    (sceneIndex === 6 && lineIndex > 0);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-200 flex flex-col font-sans overflow-hidden p-4 sm:p-8">
      <header className="w-full text-center mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-wide text-gray-400">
          {currentScene.title}
        </h1>
      </header>

      <main className="w-full flex-grow flex items-center justify-center relative">
        <div className="absolute inset-0 flex items-center justify-between px-8">
          <div
            className={`transition-opacity duration-1000 ${showNandha ? 'opacity-100' : 'opacity-0'}`}>
            {characterImages['Nandha'] && (
              <img
                src={characterImages['Nandha']}
                alt="Nandha"
                className="h-[60vh] max-h-96 sm:max-h-full object-contain"
              />
            )}
          </div>
          <div
            className={`transition-opacity duration-1000 ${showSister ? 'opacity-100' : 'opacity-0'}`}>
            {characterImages['Sister'] && (
              <img
                src={characterImages['Sister']}
                alt="Sister"
                className="h-[60vh] max-h-96 sm:max-h-full object-contain"
              />
            )}
          </div>
          <div
            className={`transition-opacity duration-1000 ${showGanesh ? 'opacity-100' : 'opacity-0'}`}>
            {characterImages['Ganesh'] && (
              <img
                src={characterImages['Ganesh']}
                alt="Ganesh"
                className="h-[60vh] max-h-96 sm:max-h-full object-contain brightness-75"
              />
            )}
          </div>
        </div>
      </main>

      <footer className="w-full max-w-4xl mx-auto relative z-10">
        <div className="bg-black/60 backdrop-blur-sm border border-gray-700 rounded-lg p-6 min-h-[160px] flex flex-col justify-between">
          <div>
            {currentLine.type === 'DIALOGUE' && (
              <h2 className="text-2xl font-bold text-indigo-400 mb-2">
                {currentLine.character}
              </h2>
            )}
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-serif">
              {revealedText}
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handlePrev}
            disabled={sceneIndex === 0 && lineIndex === 0}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Prev
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
            Next
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;