export function isDarkMode() {
    const $toolbarWrapper = $('#ccm-toolbar').parent()
    if ($toolbarWrapper.attr('data-bs-theme') === 'dark') {
        return true
    } else if ($toolbarWrapper.attr('data-bs-theme-select') === 'auto') {
        const scheme = global.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        return scheme === 'dark'
    }
    return false
}
