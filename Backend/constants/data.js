const quizzes = [
  {
    title: "Tech Basics",
    description: "General technology knowledge",
    questions: [
      { text: "What does HTML stand for?", options: ["Hyper Text Markup Language","Home Tool Markup Language","Hyperlinks and Text Markup Language","High Tech Machine Language"], correct: 0 },
      { text: "Which language is used for web apps?", options: ["Python","JavaScript","C++","Java"], correct: 1 },
      { text: "What is CSS used for?", options: ["Styling web pages","Database","Server","Logic"], correct: 0 },
      { text: "React is a ____", options: ["Library","Framework","Language","Database"], correct: 0 },
      { text: "Which company developed JavaScript?", options: ["Microsoft","Netscape","Google","Apple"], correct: 1 },
      { text: "Node.js is used for?", options: ["Frontend","Backend","Database","OS"], correct: 1 },
      { text: "Which is a NoSQL database?", options: ["MySQL","MongoDB","PostgreSQL","SQLite"], correct: 1 },
      { text: "Git is used for?", options: ["Version Control","Design","Hosting","Deployment"], correct: 0 },
      { text: "Bootstrap is a ____", options: ["JS Library","CSS Framework","Database","IDE"], correct: 1 },
      { text: "Which is a cloud provider?", options: ["AWS","Python","HTML","React"], correct: 0 }
    ]
  },
  {
    title: "Frontend Tech",
    description: "Frontend development questions",
    questions: [
      { text: "React uses ____ DOM", options: ["Virtual","Real","Shadow","None"], correct: 0 },
      { text: "JSX stands for?", options: ["JavaScript XML","Java Syntax eXtreme","Java Script eXecution","Just Syntax X"], correct: 0 },
      { text: "Which tag is self-closing in HTML?", options: ["<img>","<div>","<p>","<section>"], correct: 0 },
      { text: "CSS stands for?", options: ["Cascading Style Sheets","Computer Style Sheets","Creative Style Sheets","Custom Style Scripts"], correct: 0 },
      { text: "Which is a JS framework?", options: ["React","Django","Flask","Laravel"], correct: 0 },
      { text: "Which attribute specifies inline styles?", options: ["style","class","id","src"], correct: 0 },
      { text: "Flexbox is used in?", options: ["CSS","JS","HTML","SQL"], correct: 0 },
      { text: "State in React is used for?", options: ["Data management","Styling","Routing","Deployment"], correct: 0 },
      { text: "useEffect hook is for?", options: ["Side effects","Styling","Routing","Database"], correct: 0 },
      { text: "Which HTML tag links CSS?", options: ["<link>","<script>","<style>","<meta>"], correct: 0 }
    ]
  },
  {
    title: "Cricket Knowledge",
    description: "All about cricket",
    questions: [
      { text: "Who has most ODI centuries?", options: ["Sachin Tendulkar","Virat Kohli","Ricky Ponting","Kallis"], correct: 1 },
      { text: "How many players in a cricket team?", options: ["11","10","12","9"], correct: 0 },
      { text: "Which country won 2019 World Cup?", options: ["England","India","Australia","New Zealand"], correct: 0 },
      { text: "Which is longest format of cricket?", options: ["Test","ODI","T20","T10"], correct: 0 },
      { text: "Who is known as 'Master Blaster'?", options: ["Sachin","Dhoni","Kohli","Ganguly"], correct: 0 },
      { text: "Which country hosted 2011 World Cup?", options: ["India","Pakistan","Sri Lanka","Australia"], correct: 0 },
      { text: "What is LBW?", options: ["Leg Before Wicket","Last Ball Win","Lost By Wicket","Legal Batting Win"], correct: 0 },
      { text: "Who is the captain of India in 2023?", options: ["Rohit Sharma","Virat Kohli","MS Dhoni","Hardik Pandya"], correct: 0 },
      { text: "How many overs in ODI match?", options: ["50","20","10","40"], correct: 0 },
      { text: "Which bowler took 10 wickets in an innings?", options: ["Anil Kumble","Shane Warne","Malinga","Kapil Dev"], correct: 0 }
    ]
  },
  {
    title: "Football Knowledge",
    description: "All about football",
    questions: [
      { text: "How many players in a football team?", options: ["11","10","12","9"], correct: 0 },
      { text: "FIFA World Cup held every?", options: ["4 years","2 years","3 years","5 years"], correct: 0 },
      { text: "Which country won 2018 FIFA WC?", options: ["France","Germany","Brazil","Argentina"], correct: 0 },
      { text: "Which player is called 'CR7'?", options: ["Cristiano Ronaldo","Messi","Neymar","Mbappe"], correct: 0 },
      { text: "Who won 2022 FIFA WC?", options: ["Argentina","France","Brazil","Germany"], correct: 0 },
      { text: "How long is a football match?", options: ["90 mins","80 mins","120 mins","100 mins"], correct: 0 },
      { text: "Which country hosted 2014 FIFA WC?", options: ["Brazil","Germany","South Africa","Russia"], correct: 0 },
      { text: "What is an own goal?", options: ["Scoring in opponent’s net","Goal from free kick","Penalty goal","Goal after corner"], correct: 0 },
      { text: "Which country has most FIFA WC wins?", options: ["Brazil","Germany","Italy","Argentina"], correct: 0 },
      { text: "Who is known as 'The Pharaoh'?", options: ["Mohamed Salah","Ronaldo","Messi","Mbappe"], correct: 0 }
    ]
  },
  {
    title: "Tech & Sports Mix",
    description: "Mixed questions for fun",
    questions: [
      { text: "Who is known as 'Captain Cool' in cricket?", options: ["MS Dhoni","Virat Kohli","Rohit Sharma","Sourav Ganguly"], correct: 0 },
      { text: "Which JS framework is maintained by Facebook?", options: ["React","Angular","Vue","Svelte"], correct: 0 },
      { text: "FIFA 2022 WC winner?", options: ["Argentina","France","Brazil","Germany"], correct: 0 },
      { text: "What is HTTP full form?", options: ["Hypertext Transfer Protocol","High Transfer Text Protocol","Hyper Text Transmission Protocol","Hyperlink Transfer Tool Protocol"], correct: 0 },
      { text: "Which player has most IPL runs?", options: ["Virat Kohli","Rohit Sharma","MS Dhoni","AB de Villiers"], correct: 0 },
      { text: "CSS property for text color?", options: ["color","font","background","border"], correct: 0 },
      { text: "Which country hosted 2018 FIFA WC?", options: ["Russia","Brazil","France","Germany"], correct: 0 },
      { text: "React component can return?", options: ["JSX","String","Number","Boolean"], correct: 0 },
      { text: "Fastest century in ODI cricket?", options: ["AB de Villiers","Virat Kohli","Chris Gayle","MS Dhoni"], correct: 0 },
      { text: "HTML tag for hyperlink?", options: ["<a>","<link>","<href>","<p>"], correct: 0 }
    ]
  }
];

export default quizzes;
