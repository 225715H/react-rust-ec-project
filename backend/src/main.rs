use actix_web::{App, HttpServer};
use backend::{db::postgres::init_pg_pool, routes};
use dotenvy::dotenv;
use std::io;

#[actix_web::main]
async fn main() -> io::Result<()> {
    println!("🚀 Server starting at http://0.0.0.0:8000");

    dotenv().ok();
    let db_pool = init_pg_pool().await;
    
    HttpServer::new(|| App::new().configure(routes::configure_services))
        .bind(("0.0.0.0", 8000))?
        .run()
        .await
}
