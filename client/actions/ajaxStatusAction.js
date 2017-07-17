import * as types from './types';

/**
 *
 * Begin Ajax call
 * It begins Ajax call
 * @export
 * @returns {object}
 */
export function beginAjaxCall() {
  return { type: types.BEGIN_AJAX_CALL };
}

/**
 *
 * End Ajax Call
 * It ends Ajax Call
 * @export
 * @returns {object}
 */
export function endAjaxCall() {
  return { type: types.END_AJAX_CALL };
}
