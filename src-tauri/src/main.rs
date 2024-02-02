// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// #[tauri::command]
// fn conda_command(command: &str) -> String {
//     let output = std::process::Command::new("cmd")
//         .args(["/C", command])
//         .output()
//         .expect("conda wrong");
//     let output_str = match String::from_utf8(output.stdout) {
//         Ok(output) => output,
//         Err(e) => return "ERROR".to_owned(), // or handle it appropriately
//     };
//     output_str
// }

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
