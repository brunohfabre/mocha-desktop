// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
  tauri_plugin_deep_link::prepare("co.coddee.mocha");

  tauri::Builder::default()
    .setup(|app| {
      let handle = app.handle();
      tauri_plugin_deep_link::register(
        "mocha",
        move |request| {
          dbg!(&request);
          handle.emit_all("scheme-request-received", request).unwrap();
        },
      )
      .unwrap();

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
