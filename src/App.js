import React, { Component } from "react";
import "./App.css";
import YAML from "yamljs";
import logo from "./logo.png";

class App extends Component {
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
      <div className="App">
        <header className="App-header">
          <div className="container">
            <img src={logo} width="200" style={{ padding: "7px 0px" }} />
          </div>
        </header>
        <section className="container">
          <h3 className="mt-2">Manifest parser</h3>
        </section>
        <div className="horizontal-line" />
        <section className="container mt-2">
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
        </section>
      </div>
    );
  }
}

export default App;
