export default function FormButton({title, loading = false, ...props}) {

    return (
      <button
        className=" block bg-black text-white rounded-[50px] p-4 text-[20px] mt-[20px]" 
        type="submit"
        disabled={loading}
        {...props}
      >
          {loading ? "Loading..." : title}
      </button>
    )
  }
  