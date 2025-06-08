use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Row {
    pub key: String,
    pub value: String,
}

pub struct Store {
    pub values: Vec<Row>,
}

impl Store {
    pub fn new() -> Self {
        Store { values: Vec::new() }
    }

    pub fn add(&mut self, key: String, value: String) {
        self.values.push(Row { key, value });
    }
}

pub struct Item {
    pub key: String,
    pub value: String,
}
