import React from "react";
import { fetchJSON } from "@walmart/electrode-fetch";
import ExecutionEnvironment from "exenv";

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta: {},
      usage: [],
      demo: null,
      demoStyl: null,
      error: null
    };
  }

  componentWillMount() {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    const { org, repo } = this.props.params;
    const host = window.location.origin;
    const url = `${host}/portal/data/${org}/${repo}.json`;
    return fetchJSON(url)
      .then((res) => {
        const meta = res.meta || {};
        const usage = res.usage || [];
        this.setState({ meta, usage });

        try {
          const demo = require(`../demo-modules/${meta.name}/demo/demo.jsx`);
          const demoStyl = require(`../demo-modules/${meta.name}/demo/demo.styl`);
          this.setState({ demo, demoStyl });
        } catch (e) {
          console.log(`Error require demo in ${meta.name}`);
          this.setState({error: <div>This component does not have demo.</div>});
        }
      });
  }

  render() {
    const { meta, usage, demo, error } = this.state;
    return (
      <div>
        <h2 className="portal-title">
          {meta.title}
          <span className="component-info">
            {meta.github && <div>
              Github: <a href={meta.github}>{meta.github}</a>
            </div>}
            {meta.version && `v${meta.version}`}
            {usage.length && <div>
              This component is used in {usage.length} modules / apps.
              {usage.map((url) => (
                <div><a href={url}>{url}</a></div>
              ))}
            </div>}
          </span>
        </h2>
        { typeof demoStyl !== "undefined" && demoStyl && demoStyl }
        { typeof demo !== "undefined" && demo && <demo.default/> }
        { error && <error/> }
      </div>
    );
  }
}
