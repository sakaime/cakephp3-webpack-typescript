import "../scss/app.scss";

$(function () {
    const body = document.getElementById("body");

    const prefix = body.dataset.prefix;
    const controller = body.dataset.controller;
    const action = body.dataset.action;

    const path = prefix
        ? `./${prefix}/${controller}/${action}`
        : `./${controller}/${action}`;

    import(`${path}`);
});
