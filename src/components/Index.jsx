function Index(){
    return(
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6 text-center">
                <h1>Witaj na naszej stronie!</h1>
                <p>Wybierz jedną z poniższych opcji:</p>
                <a href="/login" className="btn btn-primary btn-lg btn-block">Logowanie</a>
                <a href="/register" className="btn btn-secondary btn-lg btn-block">Rejestracja</a>
            </div>
        </div>
    </div>
    )
}

export default Index