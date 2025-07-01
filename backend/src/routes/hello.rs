use actix_web::{HttpResponse, Responder, get};
use serde::Serialize;

#[derive(Serialize)]
struct ApiResponse {
    message: String,
}

#[get("/hello")]
pub async fn hello() -> impl Responder {
    let response = ApiResponse {
        message: "Hello from Rust Backend! 🦀".to_string(),
    };
    HttpResponse::Ok().json(response)
}
