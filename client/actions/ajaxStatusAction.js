import * as types from './types';

/**
 *
 *
 * @export
 * @returns
 */
export function beginAjaxCall() {
  return { type: types.BEGIN_AJAX_CALL };
}

/**
 *
 *
 * @export
 * @returns
 */
export function endAjaxCall() {
  return { type: types.END_AJAX_CALL };
}
