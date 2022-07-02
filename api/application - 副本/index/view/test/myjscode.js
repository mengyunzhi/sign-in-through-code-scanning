let vm = new Vue({
    el: "#container",
    data: {
        newPerson: {
            firstName: '',
            lastName: ''
        }
    },
    methods: {
        sendIdentity: function() {
            let personForm = vm.toFormData(vm.newPerson);
            axios.post('phpfile.php', personForm)
                .then( function(response) {
                    console.log(response.data)
                });
        },
        toFormData: function(obj) {
            let formData = new FormData();
            for(let key in obj) {
                formData.append(key, obj[key]);
            }
            return formData;
        }
    }
});