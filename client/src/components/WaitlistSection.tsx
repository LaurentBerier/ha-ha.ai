import { useState } from 'react';
import { type Language, copy } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertWaitlistSchema } from '@shared/schema';
import { z } from 'zod';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import stageImage from '@assets/image_1769047346055.png';

interface WaitlistSectionProps {
  language: Language;
}

const waitlistFormSchema = insertWaitlistSchema.extend({
  email: z.string().email('Please enter a valid email address'),
});

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;

export function WaitlistSection({ language }: WaitlistSectionProps) {
  const t = copy[language].cta;
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: WaitlistFormValues) => {
      const response = await apiRequest('POST', '/api/waitlist', data);
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/waitlist/count'] });
    },
  });

  const onSubmit = (data: WaitlistFormValues) => {
    mutation.mutate(data);
  };

  return (
    <section id="waitlist" className="py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${stageImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.description}
          </p>
        </div>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 p-6 bg-card rounded-md border border-border">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span className="text-lg font-medium">{t.success}</span>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t.placeholder}
                        {...field}
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                disabled={mutation.isPending}
                data-testid="button-submit-waitlist"
              >
                {mutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {t.button}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        )}

        {mutation.isError && (
          <p className="text-center text-destructive mt-4" data-testid="text-error">
            {t.error}
          </p>
        )}
      </div>
    </section>
  );
}
