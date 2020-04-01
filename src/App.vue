<template>
    <div id="app">
        <router-view name="nav"></router-view>
        <router-view></router-view>
    </div>
</template>
<style lang="scss">

    @media screen and (max-width: 991px) {
        .mobile-disable {
            display: none;
        }
        .real-time-value {
            font-weight: bold;
            font-size: 16px;
            color: white
        }

        .real-time-title {
            font-size: 14px;
            color: darkgrey
        }
    }
    @media screen and (min-width: 992px) {
        .desktop-disable {
            display: none!important;
        }
        .real-time-value {
            font-weight: bold;
            font-size: 18px;
            color: white
        }

        .real-time-title {
            font-size: 16px;
            color: darkgrey
        }
    }

    @import "~bootstrap/scss/bootstrap";
    $title-color: white;
    $nav-bg: #181745;
    $nav-active: #42b983;
    $nav-inactive: #9e9e9e;
    nav {
        background-color: $nav-bg;
        height: 60px;
    }

    nav a.router-link-exact-active {
        color: $nav-active;
    }

    nav a {
        font-weight: normal;
        color: $title-color;
        vertical-align: middle;
    }

    body {
        margin: 0;
        padding: 0;
        height: auto;
        font-family: 'Noto Sans TC', 'Oswald', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: linear-gradient(to bottom left, #216e93, #21648a, #1f5881, #172d5b, #191c51);
        color: #373d3f;
        /*color: #f5f5f5;*/
        font-size: 16px;
        text-align: center;
    }

    nav {
        padding: 1rem;
    }

    h1, h2, h3, h4, h5, h6 {
        color: $title-color;
    }

    img {
        width: 100%;
        height: auto;
    }
</style>
