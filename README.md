# AdaptiveWebDesign.info

This is the website for my book <cite>Adaptive Web Design: Crafting Rich Experiences with Progressive Enhancement</cite>.

## Build and deployment

Use Ruby 3.3 and Bundler:

```sh
bundle install
JEKYLL_ENV=production bundle exec jekyll build
bundle exec jekyll serve
```

GitHub Actions builds pull requests and publishes `_site` from `main` to GitHub
Pages. Select **GitHub Actions** as the Pages publishing source and set the
custom domain to `adaptivewebdesign.info` in repository settings. The domain is
configured there; a `CNAME` file alone does not configure an Actions deployment.

The maintained source on `main` already retains the deployed `gh-pages` change
removing the first-edition Twitter widget script. The old branch remains
available for comparison and rollback.

The apex requires all four GitHub Pages A records: `185.199.108.153`,
`185.199.109.153`, `185.199.110.153`, and `185.199.111.153`. Configure `www` as a
CNAME to `aarongustafson.github.io`. Verify the certificate before enabling
HTTPS enforcement. Apache `.htaccess` cache headers are not applied by Pages.

The poster-contest archive's original Easy Readers stylesheet and logo no
longer exist at their original URLs. Its content and downloads are preserved
with a small local archival stylesheet and a text wordmark. Missing video play
button images are replaced by a local SVG.