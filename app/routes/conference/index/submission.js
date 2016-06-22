import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.createRecord('node', {
            conference: this.modelFor('conference.index'),
            tags: [],
        });
    },
    actions: {
        saveNodeSubmission(newNode, title, contributors, description, tags){
            this.get('controller').send('resetErrorMessages');
            if ((document.getElementById('title').value.length >= 3) &&
                    (document.getElementById('contributors').value.length >= 3) &&
                    (document.getElementById('description').value.length >= 6))  {

                let conferenceModel = this.modelFor('conference.index');
                    newNode.setProperties({
                    title: title,
                    description: description,
                    category: 'project',
                    conference: conferenceModel,
                    tags: tags.toString(),
                });
                console.log(conferenceModel);
                document.getElementById("fileSubmission").reset();
                newNode.save();
                this.transitionTo('conference.index.index', conferenceModel.id);
            }

            else {
                var controlErrors = this.controllerFor('conference.index.submission');
                controlErrors.send('displayErrors');
            }
        },

        cancelSubmission()
        {
            let conferenceModel = this.modelFor('conference.index.index');
            this.transitionTo('conference.index.index', conferenceModel.id);
        }
    }
});
