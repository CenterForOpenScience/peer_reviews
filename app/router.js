import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.route('conference', { path: '/conference' }, function() {
        this.route('index', { path:'/:conference_id'}, function() {
            this.route('index', { path:'/' });
            this.route('submission', { path: '/submission' });
        });
    });
    this.route('register');
    this.route('login');
    this.route('reviews');
    this.route('evaluation');
    this.route('evalConfirmation');
    this.route('assignreview');
    this.route('reviewslist');
    this.route('signup');
    this.route('evaluation-page');
    this.route('peerdashboard', function() {});

    //replacement for peerdashboard
    this.route('editing', function() {
        this.route('submission', { path: '/submission/:submission_id' });
        this.route('submissions');
    });
});

export default Router;
