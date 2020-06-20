let
  pkgs = import (builtins.fetchTarball {
    # Descriptive name to make the store path easier to identify
    name = "nixos-19.09-2019-10-14";
    # Rev obtained using `git ls-remote https://github.com/nixos/nixpkgs-channels nixos-19.09`
    url = https://github.com/nixos/nixpkgs-channels/archive/7952807791daf3c60c99f10f371f732d897e3de8.tar.gz;
    # Hash obtained using `nix-prefetch-url --unpack <url>`
    sha256 = "1h9wg0arazbyj8xfgvfhzn2gw6ya8sgcxscy1n5j182b5xri1xdk";
  }) {};
in
  pkgs.mkShell {
    buildInputs = [
      pkgs.nodejs-12_x
    ];
  }
