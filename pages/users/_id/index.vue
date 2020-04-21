<template>
    <div>
        <h1>A Single user, ID: {{ $route.params.id }}</h1>
    </div>
</template>
<script>
export default {
    validate (data){
        console.log('data: ' + data.params);
        return data.params.id == 1
    }
}
</script>