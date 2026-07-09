<script setup></script>

<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <router-link class="navbar-brand" to="/">
            FHIR Exchange
        </router-link>
        <div class="navbar-nav">
            <router-link class="nav-link" to="/organization">
                Organization
            </router-link>
            <router-link class="nav-link" to="/practitioner">
                Practitioner
            </router-link>
            <router-link class="nav-link" to="/patient">
                Patient
            </router-link>
            <router-link class="nav-link" to="/query">
                Query
            </router-link>
        </div>
    </div>
</nav>
<div class="container mt-4">
    <router-view />
</div>
</template>

<style scoped></style>
