import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">JLZK Repairs!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Beautiful Downtown Alaminos City, JLZKDEV Repairs  provides a trained staff ready to meet your tech repair needs.</p>
                <address className="public__addr">
                    JLZKDEV<br />
                    160 Ritua Street<br />
                    Alaminos City, Pangasinan 2404<br />
                    <a href="tel:+639165553014">(+63) 91655553014</a>
                </address>
                <br />
                <p>Owner: Julius Biascan</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public