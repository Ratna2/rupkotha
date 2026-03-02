import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";

function ContactContent() {
  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <ContactDetails />
        <ContactForm />
      </div>
    </section>
  );
}

export default ContactContent;