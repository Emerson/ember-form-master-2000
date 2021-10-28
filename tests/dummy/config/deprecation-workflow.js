window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "ember-global" },
    { handler: "silence", matchId: "ember.built-in-components.import" },
    { handler: "silence", matchId: "ember.globals-resolver" },
    { handler: "silence", matchId: "deprecated-run-loop-and-computed-dot-access" },
    { handler: "silence", matchId: "ember-views.curly-components.jquery-element" },
    { handler: "silence", matchId: "this-property-fallback" },
    { handler: "silence", matchId: "ember-metal.get-with-default" },
    { handler: "silence", matchId: "ember-component.send-action" },
    { handler: "silence", matchId: "ember.built-in-components.legacy-arguments" },
  ]
};
