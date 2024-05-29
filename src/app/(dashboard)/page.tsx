'use client'
import ContentsBlock from '@/app/components/ContentsBlock'


const Index: React.FC = () => {
  return (
    <ContentsBlock>
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        
      <div className="text-sm leading-6">
        <figure className="relative flex flex-col-reverse bg-slate-100 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
          <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,</p>
          </blockquote>
          <figcaption className="flex items-center space-x-4">
            <img src="https://images.unsplash.com/photo-1632910121591-29e2484c0259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxjb2RlcnxlbnwwfDB8fHwxNzEwMTY0NjIzfDA&ixlib=rb-4.0.3&q=80&w=1080" alt="" className="flex-none w-14 h-14 rounded-full object-cover" loading="lazy" decoding="async" />
            <div className="flex-auto">
              <div className="text-base text-slate-900 font-semibold dark:text-slate-200">John Doe</div>
              <div className="mt-0.5 dark:text-slate-300">Web Developer</div>
            </div>
          </figcaption>
        </figure>
    </div>

      </div>
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-3">
          <h1 className="font-bold text-xl text-teal-400">Task List</h1>
        </div>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead className="bg-gray-50 dark:bg-neutral-800">
              <tr>
                <th scope="col" className="ps-6 py-3 text-start">
                  <label htmlFor="hs-at-with-checkboxes-main" className="flex">
                    <input type="checkbox" className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-main" />
                    <span className="sr-only">Checkbox</span>
                  </label>
                </th>
                <th scope="col" className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                      Title
                    </span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-start">
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                      Limit
                    </span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-end"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="size-px whitespace-nowrap">
                  <div className="ps-6 py-3">
                    <label htmlFor="task-1" className="flex">
                      <input type="checkbox" className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="task-1" />
                      <span className="sr-only">Checkbox</span>
                    </label>
                  </div>
                </td>
                <td className="size-px whitespace-nowrap">
                  <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                    <div className="flex items-center gap-x-3">
                      <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">Task Name</span>
                    </div>
                  </div>
                </td>
                <td className="size-px whitespace-nowrap">
                  <div className="px-6 py-3">
                    <span className="text-sm text-gray-500 dark:text-neutral-500">2024.05.26</span>
                  </div>
                </td>
                <td className="size-px whitespace-nowrap">
                  <div className="px-6 py-1.5">
                    <a className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500 cursor-pointer">
                      Edit
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ContentsBlock>
  )
}

export default Index