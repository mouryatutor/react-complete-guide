import { CORE_CONCEPTS , EXAMPLES } from './data.js';
import Header from "./components/Header/Header.jsx"
import CoreConcepts from './components/CoreConcepts.jsx';
import TabButton from './components/TabButton.jsx';
import { Fragment, useState } from 'react';

function App() {
  console.log("calling app");
  var [selectedTopic,setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton)
    console.log(selectedTopic);
  }

  let tableContent = <p>Please select a topic.</p>;
  if(selectedTopic)
  {
    tableContent = (<div id="tab-content">
                    <h3>{EXAMPLES[selectedTopic].title}</h3>
                    <p>{EXAMPLES[selectedTopic].description}</p>
                    <pre>
                        <code>{EXAMPLES[selectedTopic].code}</code>
                    </pre>
                  </div>);
  }


  return (
    <Fragment>
      <Header/>
      <main>
        <section id='core-concepts'>
          <h2>Time to get started!</h2>
          <ul>
           {CORE_CONCEPTS.map((conceptItem) => (
            <CoreConcepts key={conceptItem.title} {...conceptItem}></CoreConcepts>
           ))}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton isSelected={selectedTopic === "components"} onSelect={() => handleSelect("components")}>Components</TabButton>
            <TabButton isSelected={selectedTopic === "jsx"} onSelect={() => handleSelect("jsx")}>JSX</TabButton>
            <TabButton isSelected={selectedTopic === "props"} onSelect={() => handleSelect("props")}>Props</TabButton>
            <TabButton isSelected={selectedTopic === "state"} onSelect={() => handleSelect("state")}>State</TabButton>
          </menu>
          {tableContent}
        </section>
      </main>
    </Fragment>
  );
}

export default App;
