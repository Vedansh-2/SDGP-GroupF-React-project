/*

Authored by:
Osman


The home component exists as the starting point for users after logging in.


*/

function HomePage() {
  return (
    <div>
      <main
        className="govuk-main-wrapper app-main-class"
        id="main-content"
        role="main"
      >
        <h1 className="govuk-heading-xl">Home, place holder text:</h1>
        <p className="govuk-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu
          ultrices vitae auctor eu augue ut lectus arcu bibendum. Erat velit
          scelerisque in dictum non consectetur a. Sem et tortor consequat id
          porta nibh venenatis. Diam maecenas sed enim ut sem viverra aliquet
          eget. Massa placerat duis ultricies lacus. Sollicitudin ac orci
          phasellus egestas tellus rutrum tellus pellentesque. Ultricies mi eget
          mauris pharetra et. Sagittis purus sit amet volutpat consequat. Lectus
          vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt.
          <br /> <br /> Libero enim sed faucibus turpis in eu mi bibendum neque.
          Sed vulputate odio ut enim blandit. Interdum consectetur libero id
          faucibus nisl tincidunt. Nunc sed velit dignissim sodales ut eu sem.
          Amet justo donec enim diam vulputate ut pharetra sit amet. Eu nisl
          nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Blandit turpis
          cursus in hac. Viverra vitae congue eu consequat ac felis. Pharetra et
          ultrices neque ornare. Vel eros donec ac odio tempor orci dapibus
          ultrices. Tellus elementum sagittis vitae et leo duis ut diam quam.
          Egestas sed tempus urna et. Vitae sapien pellentesque habitant morbi.
          Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Volutpat
          odio facilisis mauris sit amet massa vitae tortor condimentum.
          <br />
          <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds">
                  <h1 className="govuk-heading-xl">Placeholder A</h1>
                </div>
              </div>
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds">
                  <h2 className="govuk-heading-l">Placeholder B</h2>
                  <p className="govuk-body-l">
                    Sed eget quam vel lacus tempor ornare id vitae est. Ut a
                    vehicula dolor. Nulla feugiat ullamcorper lectus, nec rutrum
                    ante imperdiet vitae. Ut at erat eu erat dignissim semper.
                    Vivamus non porttitor magna. Quisque nec nunc dui. Nunc sit
                    amet metus id mauris laoreet pretium nec eget sapien.
                    Maecenas sollicitudin fermentum velit, vitae varius purus
                    venenatis id.
                  </p>
                  <p className="govuk-body">
                    Suspendisse eget bibendum libero. Interdum et malesuada
                    fames ac ante ipsum primis in faucibus. Integer maximus
                    accumsan est eget tincidunt.
                  </p>
                </div>
                <div className="govuk-grid-column-one-third">
                  <h3 className="govuk-heading-m">Placeholder C</h3>
                  <p className="govuk-body">
                    Nam quis nulla scelerisque, convallis arcu in, dapibus
                    felis. In vehicula aliquam dignissim.
                  </p>
                </div>
              </div>
            </main>
          </div>
        </p>
      </main>
    </div>
  );
}
export default HomePage;
