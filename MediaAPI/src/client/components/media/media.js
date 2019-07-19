Vue.component('media', {
  props: ['_id',
    'UsageClass',
    'CheckoutType',
    'MaterialType',
    'CheckoutYear',
    'Checkouts',
    'Title',
    'Creator',
    'Subjects',
    'Publisher',
    'PublicationYear'],
  template: `
    <div class="col col-md-6 col-xl-4">
      <article class="card mt-5"> 
        <section class="card-header"> 
          by: {{ Creator }}
        </section>
        <section class="card-body">
          <h5 class="card-title text-center text-truncate"> {{ trimTitle(Title) }} </h5>
          <p class="card-text"> 
            <span class="font-weight-bold"> Category:</span> 
            <span class="font-weight-normal"> {{ MaterialType }} </span>
          </p>
          <p class="card-text"> 
            <span class="font-weight-bold"> Subjects:</span> 
            <span class="font-weight-normal"> {{ Subjects }} </span>
          </p>
          <p class="card-text"> 
            <span class="font-weight-bold"> Publisher:</span> 
            <span class="font-weight-normal"> {{ Publisher }} </span>
          </p>
          <p class="card-text"> 
            <span class="font-weight-bold"> PublicationYear:</span> 
            <span class="font-weight-normal"> {{ PublicationYear }} </span>
          </p>
        </section>

        <div class="card-footer text-muted">
          <router-link class="nav-item nav-link" v-bind:to="'/media/' + _id">
            id: {{ _id }}
          </router-link>
        </div>

      </article>
    </div>
    `,
  methods: {
    trimTitle: (str) => {
      let arr = [];
      let newStr = '';

      if (str && str.includes('/')) {
        arr = str.split(' / ');
        newStr = arr[0];
        //newStr = newStr.slice(1);
        if (newStr.includes('[')) {
          arr = newStr.split(' [');
          newStr = arr[0];
        }
        str = newStr;
      }
      return str;
    },
  }
});