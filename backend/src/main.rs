mod api;

use actix_web::{App, HttpServer};
use std::io;

#[actix_web::main]
async fn main() -> io::Result<()> {
    println!("🚀 Server starting at http://0.0.0.0:8000");

    HttpServer::new(|| App::new().configure(api::configure_services))
        .bind(("0.0.0.0", 8000))?
        .run()
        .await
}
