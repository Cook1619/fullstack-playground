import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState<string[]>([]);
  const [counts, setCounts] = useState<{ Fizz: number; Buzz: number; FizzBuzz: number }>({
    Fizz: 0,
    Buzz: 0,
    FizzBuzz: 0,
  });

  useEffect(() => {
    // Fetch data from the server
    fetch('http://localhost:3001/api/random')
      .then((response) => response.json())
      .then((result) => {
        setData(result);

        // Calculate counts for Fizz, Buzz, and FizzBuzz
        const fizzCount = result.filter((item: string) => item === 'Fizz').length;
        const buzzCount = result.filter((item: string) => item === 'Buzz').length;
        const fizzBuzzCount = result.filter((item: string) => item === 'FizzBuzz').length;

        setCounts({ Fizz: fizzCount, Buzz: buzzCount, FizzBuzz: fizzBuzzCount });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Occurrences of Fizz, Buzz, and FizzBuzz:</p>
        <ul>
          <li>Fizz: {counts.Fizz}</li>
          <li>Buzz: {counts.Buzz}</li>
          <li>FizzBuzz: {counts.FizzBuzz}</li>
        </ul>
      </header>
    </div>
  );
}

export default App;