import React, { Component } from "react";
import YAML from "yamljs";

class ManifestParser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      value: JSON.stringify(
        {
          name: "otpweb.dnp.dappnode.eth",
          version: "0.0.3",
          description: "OTP web for DAppNode",
          avatar: "QmYyT1ivVEVvu9V4cgSJVw3ivVTpq96h3Knkujs3qVzboR",
          type: "service",
          image: {
            path: "otpweb.dnp.dappnode.eth_0.0.3.tar.xz",
            hash: "QmaBqQA9bj6dYiMhGzAoVQeUwJ6G7szvi1yPGYrPYXtjdS",
            size: 4873175,
            environment: ["VIRTUAL_HOST", "LETSENCRYPT_HOST"],
            name: "otpweb.dnp.dappnode.eth",
            version: "0.0.3"
          },
          author: "Eduardo Antuña Díez (eduadiez)",
          license: "MIT",
          dependencies: {
            "nginx-proxy.dnp.dappnode.eth": "latest",
            "letsencrypt-nginx.dnp.dappnode.eth": "latest"
          }
        },
        null,
        2
      )
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });

    // const text = JSON.parse(event.target.value);
    // this.setState({ text });
  }

  render() {
    var rows = "20";

    // transformation
    let error;
    let yaml;
    try {
      console.log(this.state.value);
      let manifest = JSON.parse(this.state.value);
      yaml = YAML.stringify(manifest, 4);
      error = null;
    } catch (e) {
      error = "Error parsing manifest: " + e.message;
    }

    return (
      <div className="row">
        <div className="col-md">
          <h5>Manifest (json)</h5>
          <textarea
            rows={rows}
            value={this.state.value}
            onChange={this.handleChange}
          />
        </div>
        <div className="col-md">
          <h5>Docker-compose (yml)</h5>
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <textarea rows={rows} value={yaml} onChange={() => {}} />
          )}
        </div>
      </div>
    );
  }
}

export default ManifestParser;
