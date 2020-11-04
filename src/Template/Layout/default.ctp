<!DOCTYPE html>
<html>
<head>
    <?= $this->Html->charset() ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <?= $this->Html->meta('icon') ?>
    <?= $this->Html->css('app.css') ?>
</head>
<body <?= $this->getBodyData() ?> <?= $this->getBodyClass() ?>>
    <?= $this->fetch('content') ?>
    <?= $this->Html->script('app.js') ?>
</body>
</html>
