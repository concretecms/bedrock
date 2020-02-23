let mix = require('laravel-mix');

mix.webpackConfig({
    externals: {
        dropzone: 'Dropzone',
        jquery: 'jQuery'
    }
});

mix.setPublicPath('public');

// Bedrock
mix
    .js('assets/bedrock/js/frontend.js', 'bedrock/frontend.js');

// Content Accessories
mix
    .js('assets/account/js/frontend.js', 'account/frontend.js')
    .js('assets/calendar/js/backend.js', 'calendar/backend.js')
    .js('assets/conversations/js/frontend.js', 'conversations/frontend.js')
    .js('assets/imagery/js/frontend.js', 'imagery/frontend.js')

// CKEditor
mix
    .js('assets/ckeditor/js/concrete.js', 'ckeditor/concrete.js')
    .sass('assets/ckeditor/scss/concrete.scss', 'ckeditor/concrete.css')
