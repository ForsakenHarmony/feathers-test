import { Link } from 'preact-router';

const Index = () => (
  <main class="home container">
    <div class="row">
      <div class="col-12 col-8-tablet push-2-tablet text-center">
        <img class="logo center-item"
             src="http://feathersjs.com/img/feathers-logo-wide.png"
             alt="Feathers Logo"/>
        <h3 class="title">Chat</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-12 push-4-tablet col-4-tablet">
        <div class="row">
          <div class="col-12">
            <Link href="/login" class="button button-primary block login">
              Login
            </Link>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <Link href="/signup" class="button button-primary block signup">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default Index;
