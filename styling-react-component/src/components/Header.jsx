import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p style={{
        color: "blue",
        textAlign: "left"
      }}>A community of artists and art-lovers.</p>
    </header>
  );
}
