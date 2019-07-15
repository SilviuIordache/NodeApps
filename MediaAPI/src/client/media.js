Vue.component('media', {
  props: ['_id', 'UsageClass','CheckoutType','MaterialType', 'CheckoutYear', 'Checkouts', 'Title', 'Creator', 'Subjects', 'Publisher', 'PublicationYear'],
  template: `
  <article class="card mt-5"> 
    <section class="card-header"> 
     creator: {{ trimTitle(Creator) }}
    </section>
    <section class="card-body">
      <h5 class="card-title text-center text-truncate"> {{ Creator }} </h5>
      <p class="card-text"> Publisher: {{ Publisher }} </p>
      <p class="card-text"> Type: {{ MaterialType }} </p>
      <p class="card-text"> CheckoutYear: {{ CheckoutYear }} </p>
      <p class="card-text"> PublicationYear: {{ PublicationYear }} </p>
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
      
        if (str.includes('/')) {
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
  <div class="col">
    <media class="row" 
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

const mediaComp = Vue.component('mediaItems', {
  mounted: function () {
    //get mediaItems
    axios('/media').then((resp) => {
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
    <media-list :mediaItems='mediaItems'></media-list>
  </article>
  `
})

