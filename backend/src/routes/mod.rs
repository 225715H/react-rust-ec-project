pub mod hello;

use actix_web::web;

pub fn configure_services(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/api").service(hello::hello));
}
