import { useState } from 'react';
import { Lesson, Demo, Note, Challenge } from '../../ui/Lesson.jsx';

// Importing the DEFAULT export (we may name it whatever we want here)
// together with two NAMED exports (whose names must match).
import openHolocron, { HOLOCRON_KEEPER, listTeachings } from './holocron.js';

// import { decryptKyberSignature } from './holocron.js';
//   ^ uncomment this line to see the error the slides talk about:
//     the function exists in holocron.js but it is not exported,
//     so from the outside it simply does not exist.

export default function ModulesLesson() {
  const [teaching, setTeaching] = useState('jedi-code');

  return (
    <Lesson
      slide="slide 23 — What is a module"
      title="1 · Modules: the Jedi holocron"
      idea="A module exposes a small public surface and hides everything else. Public = exported. Private = not exported."
    >
      <Demo title="Opening the holocron">
        <p>
          Archive keeper: <strong>{HOLOCRON_KEEPER}</strong>
        </p>
        <div className="row">
          {listTeachings().map((id) => (
            <button
              key={id}
              className={id === teaching ? 'primary' : ''}
              onClick={() => setTeaching(id)}
            >
              {id}
            </button>
          ))}
          <button onClick={() => setTeaching('order-66')}>order-66</button>
        </div>
        <p className="output">{openHolocron(teaching)}</p>
      </Demo>

      <Note>
        <ul>
          <li>
            <code>holocron.js</code> exports three things:{' '}
            <code>openHolocron</code> (default), <code>HOLOCRON_KEEPER</code>{' '}
            and <code>listTeachings</code>.
          </li>
          <li>
            <code>decryptKyberSignature</code> and <code>SEALED_ARCHIVE</code>{' '}
            are <em>not</em> exported. The decryption algorithm is an
            implementation detail: we could replace it tomorrow and no other
            file would need a single change. That is exactly the{' '}
            <em>low coupling</em> we were after in slide 5.
          </li>
          <li>
            Notice how the module also gives us <em>high cohesion</em>:
            everything about holocrons lives in one file and nothing else does.
          </li>
        </ul>
      </Note>

      <Challenge>
        <ol>
          <li>
            Uncomment the <code>decryptKyberSignature</code> import at the top
            of this file and read the error message carefully.
          </li>
          <li>
            Add a <code>sealTeaching(id, text)</code> function to the module,
            keeping the encryption private. Which parts had to change outside{' '}
            <code>holocron.js</code>? (Answer: none.)
          </li>
        </ol>
      </Challenge>
    </Lesson>
  );
}
