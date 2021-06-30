/**
 * @param title
 * @param variant
 * @param body
 */
export function makeToast(body = '', variant = null, title = 'Action performed successfully.',) {
    this.$root.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 2500
    })
}
