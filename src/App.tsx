import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

const formSchema = z
  .object({
    emailAddress: z.string().email(),
    password: z.string().min(3),
    passwordConfirm: z.string().min(3),
    accountType: z.enum(["personal", "company"]),
    companyName: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Password do not match",
      path: ["passwordConfirm"],
    }
  )
  .refine(
    (data) => {
      if (data.accountType === "company") {
        return !!data.companyName;
      }
      return true;
    },
    {
      message: "Company name is required",
      path: ["companyName"],
    }
  );

const App = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      passwordConfirm: "",
      companyName: "",
    },
  });

  const accountType = form.watch("accountType");

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email address"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Account Type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {accountType === "company" && (
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Company name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter company name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button className="w-full">Submit</Button>
        </form>
      </Form>
    </main>
  );
};

export default App;
