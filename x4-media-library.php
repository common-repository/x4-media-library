<?php
/**
 * Plugin Name: X4 Media Library
 * Plugin URI: https://codecanyon.net/item/x4-media-library-for-wordpress/24017686
 * Description: X4 Media Library is the explorer-like Media Library for WordPress.
 * Version: 2.0.5
 * Requires at least: 4.2
 * Requires PHP: 5.3
 * Author: x4wp
 * Author URI: https://codecanyon.net/user/x4wp
 * Text Domain: x4-media-library
 */

namespace X4MediaLibrary;


if (!defined('ABSPATH')) {
  die('No script kiddies please!');
}


const ROOT_FILE = __FILE__;


require_once(__DIR__ . '/includes/ajax/actions/bootstrap/files.inc');
require_once(__DIR__ . '/includes/ajax/actions/bootstrap/folders.inc');
require_once(__DIR__ . '/includes/ajax/actions/bootstrap/nonces.inc');
require_once(__DIR__ . '/includes/ajax/actions/delete/folders.inc');
require_once(__DIR__ . '/includes/ajax/actions/delete/files.inc');
require_once(__DIR__ . '/includes/ajax/actions/upload/folders.inc');
require_once(__DIR__ . '/includes/ajax/actions/upload/files.inc');
require_once(__DIR__ . '/includes/ajax/actions/copy.inc');
require_once(__DIR__ . '/includes/ajax/actions/move.inc');
require_once(__DIR__ . '/includes/ajax/files/rename.inc');
require_once(__DIR__ . '/includes/ajax/folders/update/color.inc');
require_once(__DIR__ . '/includes/ajax/folders/update/icon.inc');
require_once(__DIR__ . '/includes/ajax/folders/create.inc');
require_once(__DIR__ . '/includes/ajax/folders/rename.inc');
require_once(__DIR__ . '/includes/ajax/settings/file_extensions/update/allowed.inc');
require_once(__DIR__ . '/includes/ajax/settings/file_extensions/create.inc');
require_once(__DIR__ . '/includes/ajax/settings/file_extensions/delete.inc');
require_once(__DIR__ . '/includes/ajax/settings/ignored_folders/update/ignore.inc');
require_once(__DIR__ . '/includes/ajax/settings/ignored_folders/create.inc');
require_once(__DIR__ . '/includes/ajax/settings/ignored_folders/delete.inc');
require_once(__DIR__ . '/includes/ajax/ajax.inc');
require_once(__DIR__ . '/includes/models/files/create/copy.inc');
require_once(__DIR__ . '/includes/models/files/delete/delete.inc');
require_once(__DIR__ . '/includes/models/files/getters/get_count.inc');
require_once(__DIR__ . '/includes/models/files/getters/get_files.inc');
require_once(__DIR__ . '/includes/models/files/update/move.inc');
require_once(__DIR__ . '/includes/models/files/update/rename.inc');
require_once(__DIR__ . '/includes/models/files/update/update_content_url.inc');
require_once(__DIR__ . '/includes/models/folders/create/copy.inc');
require_once(__DIR__ . '/includes/models/folders/create/create.inc');
require_once(__DIR__ . '/includes/models/folders/create/db_ensure.inc');
require_once(__DIR__ . '/includes/models/folders/create/db_create.inc');
require_once(__DIR__ . '/includes/models/folders/delete/delete.inc');
require_once(__DIR__ . '/includes/models/folders/getters/get_db_folder.inc');
require_once(__DIR__ . '/includes/models/folders/getters/get_db_folders.inc');
require_once(__DIR__ . '/includes/models/folders/getters/get_folder.inc');
require_once(__DIR__ . '/includes/models/folders/getters/get_folders.inc');
require_once(__DIR__ . '/includes/models/folders/getters/get_physical_folder_paths.inc');
require_once(__DIR__ . '/includes/models/folders/getters/get_physical_folder.inc');
require_once(__DIR__ . '/includes/models/folders/getters/get_physical_folders.inc');
require_once(__DIR__ . '/includes/models/folders/table/table.inc');
require_once(__DIR__ . '/includes/models/folders/update/move.inc');
require_once(__DIR__ . '/includes/models/folders/update/rename.inc');
require_once(__DIR__ . '/includes/models/folders/update/update_color.inc');
require_once(__DIR__ . '/includes/models/folders/update/update_icon.inc');
require_once(__DIR__ . '/includes/models/folders/utils/sort_longest.inc');
require_once(__DIR__ . '/includes/models/folders/utils/sort_shortest.inc');
require_once(__DIR__ . '/includes/models/settings/ignored_folders/create_ignored_folder.inc');
require_once(__DIR__ . '/includes/models/settings/ignored_folders/delete_ignored_folder.inc');
require_once(__DIR__ . '/includes/models/settings/ignored_folders/get_ignored_folders.inc');
require_once(__DIR__ . '/includes/models/settings/ignored_folders/ignored_folders.inc');
require_once(__DIR__ . '/includes/models/settings/ignored_folders/set_ignored_folders.inc');
require_once(__DIR__ . '/includes/models/settings/ignored_folders/update_ignored_folder_ignore.inc');
require_once(__DIR__ . '/includes/models/settings/mime_types/create_custom_mime_type.inc');
require_once(__DIR__ . '/includes/models/settings/mime_types/delete_custom_mime_type.inc');
require_once(__DIR__ . '/includes/models/settings/mime_types/get_custom_mime_types.inc');
require_once(__DIR__ . '/includes/models/settings/mime_types/get_file_extensions.inc');
require_once(__DIR__ . '/includes/models/settings/mime_types/set_custom_mime_types.inc');
require_once(__DIR__ . '/includes/models/settings/mime_types/update_mime_type_allowed.inc');
require_once(__DIR__ . '/includes/models/settings/mime_types/upload_mimes.inc');
require_once(__DIR__ . '/includes/models/settings/thumb_size/get_thumb_size.inc');
require_once(__DIR__ . '/includes/models/settings/uploads/yearmonth.inc');
require_once(__DIR__ . '/includes/plugin/bootstrap/enqueue.inc');
require_once(__DIR__ . '/includes/plugin/bootstrap/get_dependencies.inc');
require_once(__DIR__ . '/includes/plugin/bootstrap/get_localize.inc');
require_once(__DIR__ . '/includes/plugin/bootstrap/redirect.inc');
require_once(__DIR__ . '/includes/plugin/patches/1.x.x/patch_10000.inc');
require_once(__DIR__ . '/includes/plugin/system/check_version.inc');
require_once(__DIR__ . '/includes/plugin/system/fix_package.inc');
require_once(__DIR__ . '/includes/plugin/system/install.inc');
require_once(__DIR__ . '/includes/utils/sanitizers/sanitizers.inc');
require_once(__DIR__ . '/includes/utils/validators/validators.inc');
