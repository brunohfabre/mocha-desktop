use tauri::{WebviewUrl, WebviewWindowBuilder};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            let mut win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
                .inner_size(1280.0, 800.0)
                .min_inner_size(300.0, 300.0);

            #[cfg(target_os = "macos")]
            {
                use tauri::TitleBarStyle;
                win_builder = win_builder
                    .hidden_title(true)
                    .title_bar_style(TitleBarStyle::Overlay);
            }
            #[cfg(not(target_os = "macos"))]
            {
                // Doesn't seem to work from Rust, here, so we do it in main.tsx
                win_builder = win_builder.decorations(false);
            }

            let window = win_builder.build().unwrap();

            // set background color only when building for macOS
            #[cfg(target_os = "macos")]
            {
                use cocoa::appkit::{
                    NSAppearance, NSAppearanceNameVibrantLight, NSView, NSWindow, NSWindowButton,
                };
                use cocoa::foundation::NSRect;

                let handle = window.ns_window().unwrap() as cocoa::base::id;

                let x: f64 = f64;
                let y: f64 = f64;

                unsafe {
                    NSWindow::setAppearance(handle, NSAppearance(NSAppearanceNameVibrantLight));

                    let close = handle.standardWindowButton_(NSWindowButton::NSWindowCloseButton);
                    let miniaturize =
                        handle.standardWindowButton_(NSWindowButton::NSWindowMiniaturizeButton);
                    let zoom = handle.standardWindowButton_(NSWindowButton::NSWindowZoomButton);

                    let title_bar_container_view = close.superview().superview();

                    let title_bar_frame_height = y;
                    let mut title_bar_rect = NSView::frame(title_bar_container_view);
                    title_bar_rect.size.height = title_bar_frame_height;
                    title_bar_rect.origin.y =
                        NSView::frame(handle).size.height - title_bar_frame_height;

                    let window_buttons = vec![close, miniaturize, zoom];
                    let space_between =
                        NSView::frame(miniaturize).origin.x - NSView::frame(close).origin.x;

                    for (i, button) in window_buttons.into_iter().enumerate() {
                        let mut rect: NSRect = NSView::frame(button);
                        rect.origin.x = x + (i as f64 * space_between);
                        button.setFrameOrigin(rect.origin);
                    }
                }
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
