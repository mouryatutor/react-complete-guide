import  logoImg  from "../assets/quiz-logo.png";

export default function Header() {
    return (
        <header>
            <img src={logoImg} alt="logo" />
            <h1>REACTQUIZ</h1>
        </header>
    )
}