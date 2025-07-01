use crate::models::product::Product;

pub struct ProductRepository;

pub trait IProductRepository {
    fn get(&self, id: i32) -> Option<Product>;
    fn set(&mut self, product: Product) -> Result<(), String>;
}

impl IProductRepository for ProductRepository {
    fn get(&self, id: i32) -> Option<Product> {
        // Placeholder implementation
        Some(Product {
            name: "Sample Product".to_string(),
            price: 19.99,
            description: "This is a sample product.".to_string(),
        })
    }

    fn set(&mut self, product: Product) -> Result<(), String> {
        // Placeholder implementation
        Ok(())
    }
}
