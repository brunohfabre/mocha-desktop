use tauri::{Manager, WebviewUrl, WebviewWindowBuilder};
use tauri_plugin_deep_link::DeepLinkExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    #[allow(unused_mut)]
    let mut builder = tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_dialog::init());

    #[cfg(desktop)]
    {
        builder = builder.plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            // When trying to open a new app instance (common operation on Linux),
            // focus the first existing window we find instead of opening a new one
            // TODO: Keep track of the last focused window and always focus that one
            if let Some(window) = app.webview_windows().values().next() {
                let _ = window.set_focus();
            }
        }));
    }

    builder
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            #[cfg(any(target_os = "linux", all(debug_assertions, windows)))]
            app.deep_link().register_all()?;

            let mut win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
                .title("")
                .inner_size(1440.0, 900.0)
                .min_inner_size(300.0, 300.0);

            // set transparent title bar only when building for macOS
            #[cfg(target_os = "macos")]
            {
                use tauri::TitleBarStyle;
                win_builder = win_builder.title_bar_style(TitleBarStyle::Overlay);
            }

            #[cfg(not(target_os = "macos"))]
            {
                win_builder = win_builder.decorations(false);
            }

            let window = win_builder.build().unwrap();

            #[cfg(target_os = "macos")]
            {
                use cocoa::appkit::{NSAppearance, NSAppearanceNameVibrantLight, NSWindow};
                use cocoa::base::id;

                unsafe {
                    let ns_window = window.ns_window().unwrap() as id;

                    NSWindow::setAppearance(ns_window, NSAppearance(NSAppearanceNameVibrantLight));
                }
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
