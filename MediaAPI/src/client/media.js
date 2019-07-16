Vue.component('media', {
  props: ['_id', 'UsageClass','CheckoutType','MaterialType', 'CheckoutYear', 'Checkouts', 'Title', 'Creator', 'Subjects', 'Publisher', 'PublicationYear'],
  template: `
  <article class="card mt-5"> 
    <section class="card-header"> 
     creator: {{ Creator }}
    </section>
    <section class="card-body">
      <h5 class="card-title text-center text-truncate"> {{ trimTitle(Title) }} </h5>
      <p class="card-text"> 
        <span class="font-weight-bold"> Type:</span> 
        <span class="font-weight-normal"> {{ MaterialType }} </span>
      </p>
      <p class="card-text"> 
        <span class="font-weight-bold"> Publisher:</span> 
        <span class="font-weight-normal"> {{ Publisher }} </span>
      </p>
      <p class="card-text"> 
        <span class="font-weight-bold"> Subjects:</span> 
        <span class="font-weight-normal"> {{ Subjects }} </span>
      </p>
      <p class="card-text"> 
        <span class="font-weight-bold"> PublicationYear:</span> 
        <span class="font-weight-normal"> {{ PublicationYear }} </span>
      </p>
      <p class="card-text"> 
        <span class="font-weight-bold"> CheckoutYear:</span> 
        <span class="font-weight-normal"> {{ CheckoutYear }} </span>
      </p>
    </section>

    <div class="card-footer text-muted">
     id: {{ _id }}
    </div>

  </article>
    `,
    methods: {
       trimTitle: function(str) {
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

Vue.component('media-list', {
  props: ['mediaItems'],
  template: `
  <div class="row">
    <media class="col-4" 
      v-for="media in mediaItems"
      :_id ="media._id" 
      :UsageClass="media.UsageClass" 
      :CheckoutType="media.CheckoutType" 
      :MaterialType="media.MaterialType" 
      :CheckoutYear="media.CheckoutYear"
      :Checkouts="media.Checkouts" 
      :Title="media.Title"
      :Creator="media.Creator" 
      :Subjects="media.Subjects"  
      :Publisher="media.Publisher" 
      :PublicationYear="media.PublicationYear"> 
    </media>
  </div>
  `
})

Vue.component('filter-bar', {
  template: `
  <div class="border-right"> 
    <div class="sidebar-heading">Filters</div>

    <div class="list-group list-group-flush">
        <div class="btn-group list-group-item" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary">Ascending</button>
          <button type="button" class="btn btn-secondary">Descending</button>
        </div>
        <a href="#" class="list-group-item list-group-item-action bg-light">Order</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Shortcuts</a>
    </div>
  `
})

const mediaComp = Vue.component('mediaItems', {
  mounted: function () {
    //get mediaItems
    axios('/media/page/0?ord=asc').then((resp) => {
      this.mediaItems = resp.data;
    });
  },
  data: () => {
    return {
      mediaItems: []
    };
  },
  template: `
    <article>
      <div class="row">

        <div class="col">
          <filter-bar></filter-bar>
        </div> 

        <div class="col">
          <media-list :mediaItems='mediaItems'></media-list>
        </div> 
        
      </div> 
    </article>
  `
})

